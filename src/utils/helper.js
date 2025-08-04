export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInitials = (title) => {
  if (!title) return "";

  const words = title.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(title.length, 2); i++) {
    initials += words[i][0];
  }

  return initials;
};
