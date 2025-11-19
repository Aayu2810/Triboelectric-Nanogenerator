# Hygroelectric Research

This project is focused on the exploration and visualization of hygroelectric phenomena. It provides a web application built with React and Next.js that allows users to interact with experimental data and visualize results through various components.

## Project Structure

The project is organized as follows:

```
hygroelectric-research
├── src
│   ├── app
│   │   ├── page.tsx          # Main page component
│   │   ├── layout.tsx        # Layout component for common structure
│   │   └── globals.css       # Global CSS styles
│   ├── components
│   │   ├── WaterDroplet.tsx  # Component for visualizing a water droplet
│   │   ├── PrototypeVisualization.tsx # Component for prototype visualization
│   │   ├── DataCharts.tsx    # Component for displaying data charts
│   │   ├── InputControls.tsx  # Component for user input controls
│   │   └── Header.tsx        # Header component with navigation
│   ├── data
│   │   └── experimentalData.ts # Data related to experiments
│   └── utils
│       └── cn.ts             # Utility for class name manipulation
├── package.json               # npm configuration file
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
└── README.md                  # Project documentation
```

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hygroelectric-research.git
   ```

2. Navigate to the project directory:
   ```
   cd hygroelectric-research
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.