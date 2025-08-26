<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Equillibria Carbon Footprint Tracker

This is a React Native application built with Expo and TypeScript, designed to help users track and reduce their carbon footprint. 

## Project Structure

- `/src/screens`: All screen components for the application
- `/src/components`: Reusable UI components
- `/src/navigation`: Navigation setup using React Navigation
- `/src/services`: Services for API calls and data handling
- `/src/types`: TypeScript types and interfaces
- `/src/utils`: Utility functions and theme configuration
- `/src/assets`: Static assets like images and icons
- `/src/hooks`: Custom React hooks

## Coding Conventions

- Use TypeScript for type safety
- Use functional components with hooks
- Follow React Native best practices
- Maintain a consistent UI design with the theme in `/src/utils/theme.ts`
- Ensure all UI components are responsive and work well on various screen sizes
- Add proper documentation for complex functions and components

## Features

The app includes these main features:

1. Activity tracking for transportation, food, household, and shopping
2. Carbon footprint calculation and visualization
3. Personalized tips and recommendations
4. Community challenges and social features
5. Achievement system with badges
6. Monthly carbon goals and progress tracking

When adding new features or modifying existing ones, please ensure they align with the app's goal of helping users understand and reduce their environmental impact.

## Data Structure

Key data structures are defined in `/src/types/index.ts` and include:

- `Activity`: Represents a user activity with carbon impact
- `User`: User profile information
- `Badge`: Achievement badges
- `CarbonTip`: Tips for reducing carbon footprint
- `CarbonStats`: Statistics about carbon usage

## UI Theme

The app uses a green and blue color scheme to represent nature and sustainability. The theme is defined in `/src/utils/theme.ts`.
