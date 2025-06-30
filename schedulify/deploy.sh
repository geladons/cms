
#!/bin/bash

# Proxmox LXC Deployment Script for Schedulify

# --- Configuration ---
PCT_CMD="pct" # Proxmox container command
STORAGE="local-lvm" # Storage for the new container
BRIDGE="vmbr0" # Network bridge
CT_ID="101" # Container ID (changed to 101 to avoid conflict)
HOSTNAME="schedulify"
PASSWORD="your-strong-password" # Set a strong password for the root user
OSTYPE="ubuntu-22.04-standard_22.04-1_amd64.tar.gz" # OS template
MEMORY="1024" # Memory in MB (increased for better performance)
SWAP="512" # Swap in MB
CORES="1" # Number of CPU cores
DISK_SIZE="10G" # Disk size (increased for database)

# --- Script ---

echo "Creating LXC container..."
$PCT_CMD create $CT_ID $OSTYPE \
  --storage $STORAGE \
  --hostname $HOSTNAME \
  --password $PASSWORD \
  --memory $MEMORY \
  --swap $SWAP \
  --cores $CORES \
  --net0 name=eth0,bridge=$BRIDGE,ip=dhcp \
  --features nesting=1

echo "Starting container..."
$PCT_CMD start $CT_ID

echo "Waiting for container to start..."
sleep 15

echo "Updating container and installing dependencies..."
$PCT_CMD exec $CT_ID -- apt-get update
$PCT_CMD exec $CT_ID -- apt-get upgrade -y
$PCT_CMD exec $CT_ID -- apt-get install -y git nodejs npm curl
$PCT_CMD exec $CT_ID -- curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg
$PCT_CMD exec $CT_ID -- echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
$PCT_CMD exec $CT_ID -- apt-get update
$PCT_CMD exec $CT_ID -- apt-get install -y mongodb-org

echo "Starting MongoDB..."
$PCT_CMD exec $CT_ID -- systemctl enable mongod
$PCT_CMD exec $CT_ID -- systemctl start mongod

echo "Cloning the Schedulify repository..."
$PCT_CMD exec $CT_ID -- git clone https://your-git-repository/schedulify.git /opt/schedulify

echo "Installing application dependencies..."
$PCT_CMD exec $CT_ID -- bash -c "cd /opt/schedulify/packages/server && npm install && npm run build"
$PCT_CMD exec $CT_ID -- bash -c "cd /opt/schedulify/packages/client && npm install && npm run build"

echo "Creating systemd service for the Schedulify server..."
$PCT_CMD exec $CT_ID -- bash -c 'cat <<EOF > /etc/systemd/system/schedulify.service
[Unit]
Description=Schedulify Server
After=network.target mongod.service

[Service]
User=root
Group=root
WorkingDirectory=/opt/schedulify/packages/server
ExecStart=/usr/bin/npm run start
Restart=always
Environment=NODE_ENV=production
Environment=MONGO_URI=mongodb://localhost:27017/schedulify
Environment=JWT_SECRET=your-production-jwt-secret

[Install]
WantedBy=multi-user.target
EOF'

echo "Enabling and starting the Schedulify service..."
$PCT_CMD exec $CT_ID -- systemctl enable schedulify
$PCT_CMD exec $CT_ID -- systemctl start schedulify

echo "Deployment complete!"
echo "You can access the application at http://<container-ip>:3000"
echo "Remember to replace 'your-production-jwt-secret' in the service file."
