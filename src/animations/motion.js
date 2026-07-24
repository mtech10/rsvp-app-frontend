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

export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
  },

  hover: {
    y: -4,
    scale: 1.01,

    transition: {
      duration: 0.2,
    },
  },
};

export const buttonTap = {
  tap: {
    scale: 0.98,
  },
};

export const fadeScale = {
  hidden: {
    opacity: 0,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.25,
    },
  },

  exit: {
    opacity: 0,
    scale: 0.97,
  },
};

export const slideRight = {
  hidden: {
    opacity: 0,
    x: -12,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.25,
    },
  },
};

export const slideLeft = {
  hidden: {
    opacity: 0,
    x: 12,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.25,
    },
  },
};
