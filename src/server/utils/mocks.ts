import { type RegisterCredentials } from "../controllers/types";

export const mockCustomQuoteRequest = {
  body: {
    author: "Frida Kahlo",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/440px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg",
    country: "Mexico",
    quote: "Feet, what do I need them for if I have wings to fly?",
    tags: "artists",
    lived: "1907 - 1954",
    owner: "6408566fc095933dd9f089b2",
    creationTime: "12321443545346",
    backgroundInfo:
      "Frida Kahlo was a Mexican painter known for her self-portraits, which often incorporated elements of her physical and emotional pain.",
  },
};

export const mockedRegisterCredentials: RegisterCredentials = {
  username: "Carles",
  password: "galan9999",
  email: "cece@ece",
};
