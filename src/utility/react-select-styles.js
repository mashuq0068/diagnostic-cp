const customStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? "#3497F9" : "#D9D9D9", // Match form-input border styles
    borderWidth: state.isFocused ? "2px" : "1px", // Adjust thickness on focus
    marginTop : "8px",
    borderRadius: "8px", // Same as form-input
    padding: "0.2rem", // Slight inner padding
    transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out", // Smooth transitions
    boxShadow: state.isFocused ? "0 0 0 1px #3497F9" : "none", // Box-shadow on focus
    "&:hover": {
      borderColor: "#3497F9", // Hover border color
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#3497F9" // Background color for selected option
      : state.isFocused
      ? "#f3f4f6" // Background color for hover
      : "white", // Default
    color: state.isSelected ? "white" : "black", // Text color
    padding: "0.6rem", // Same padding as form-input
  }),
  singleValue: (base) => ({
    ...base,
    color: "black", // Text color for selected value
    fontSize: "1rem", // Optional: Adjust text size
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "hsl(0, 0%, 80%)", // Dropdown arrow color
    "&:hover": {
      color: "#3497F9", // Match hover effect
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#A0A0A0", // Placeholder text color
    fontSize: "1rem", // Match font size
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px", // Rounded corners
    zIndex: 5, // Ensure visibility
    border: "1px solid #D9D9D9", // Menu border matches form input
  }),
};


export default customStyles