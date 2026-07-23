// export const fadeUp = {
//   hidden: {
//     opacity: 0,
//     y: 20,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.35,
//       ease: "easeOut",
//     },
//   },
// };

// export const fade = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       duration: 0.3,
//     },
//   },
// };

// export const staggerContainer = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.08,
//     },
//   },
// };

// export const scaleIn = {
//   hidden: {
//     opacity: 0,
//     scale: 0.95,
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.3,
//       ease: "easeOut",
//     },
//   },
// };

// export const hoverLift = {
//   whileHover: {
//     y: -4,
//     transition: {
//       duration: 0.2,
//     },
//   },
//   whileTap: {
//     scale: 0.98,
//   },
// };

// export const menuItem = {
//   hidden: {
//     opacity: 0,
//     x: -8,
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//   },
// };

// export const menuContainer = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.04,
//       delayChildren: 0.05,
//     },
//   },
// };

// Fade In
export const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

// Fade Up
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

// Scale In
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

// Stagger Container
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Dropdown Menu
export const dropdownMenu = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      when: "beforeChildren",
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: {
      duration: 0.15,
    },
  },
};

// Dropdown Items
export const dropdownItem = {
  hidden: {
    opacity: 0,
    x: -8,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

// Modal
export const modal = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
};

// Hover Lift
export const hoverLift = {
  whileHover: {
    y: -4,
    transition: {
      duration: 0.2,
    },
  },
  whileTap: {
    scale: 0.98,
  },
};

// Hover Grow
export const hoverGrow = {
  whileHover: {
    scale: 1.03,
  },
  whileTap: {
    scale: 0.97,
  },
};
