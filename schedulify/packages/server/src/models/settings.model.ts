
import { Schema, model } from 'mongoose';

const settingsSchema = new Schema({
  auth: {
    emailPassword: { type: Boolean, default: true },
    google: { type: Boolean, default: false },
    apple: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
  },
  // We can add other application settings here in the future
});

const Settings = model('Settings', settingsSchema);

// Create a default settings document if one doesn't exist
const initializeSettings = async () => {
  const settings = await Settings.findOne();
  if (!settings) {
    console.log('Initializing default settings...');
    await new Settings().save();
  }
};

initializeSettings();

export default Settings;
