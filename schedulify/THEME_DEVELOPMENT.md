# Schedulify Theme Development

This guide provides instructions for creating and contributing new themes to the Schedulify CMS.

## Theme Structure

Schedulify uses Material-UI's theming system. A theme is a JavaScript object that defines the visual appearance of the application. The theme object is created using the `createTheme` function from `@mui/material/styles`.

A theme consists of several key parts:

*   **Palette:** Defines the color palette of the application, including primary, secondary, error, warning, info, and success colors. You can also specify the mode (`'light'` or `'dark'`).
*   **Typography:** Defines the typography of the application, including font sizes, font weights, and font families.
*   **Components:** Allows you to customize the appearance of individual Material-UI components.

### Example Theme File

Here is an example of a basic theme file (`my-theme.ts`):

```typescript
import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#ffc107',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default myTheme;
```

## Creating a New Theme

1.  **Create a new theme file:**
    Create a new file in the `packages/client/src/themes` directory with a descriptive name (e.g., `my-theme.ts`).

2.  **Define your theme:**
    Use the `createTheme` function to define your theme object. You can customize the palette, typography, and components to create a unique look and feel.

3.  **Add your theme to the `ThemeContext`:**
    Open the `packages/client/src/contexts/ThemeContext.tsx` file and import your new theme. Then, add it to the `useMemo` hook.

    ```typescript
    // ... other imports
    import myTheme from '../themes/my-theme';

    // ...

    const activeTheme = useMemo(
      () => {
        switch (theme) {
          case 'light':
            return lightTheme;
          case 'dark':
            return darkTheme;
          case 'my-theme':
            return myTheme;
          default:
            return lightTheme;
        }
      },
      [theme]
    );
    ```

4.  **Add your theme to the `ThemeSettings` component:**
    Open the `packages/client/src/components/admin/ThemeSettings.tsx` file and add your new theme to the `Select` component.

    ```typescript
    // ...

    <Select
      // ...
    >
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
      <MenuItem value="my-theme">My Theme</MenuItem>
    </Select>
    ```

## Contributing a Theme

If you've created a theme that you'd like to share with the community, please open a pull request. We'd love to see what you've created!
