import { buildPrompt } from "../../helpers";

export const THE_ROCK_BIO = {
  name: "Dwayne Johnson",
  avatarUrl: "https://i.postimg.cc/fTMJMVqy/Screenshot-2024-06-27-at-12-00-17-AM.png",
  character: "The Rock (WWE)",
}


export const THE_ROCK = {
  role: "system",
  content: buildPrompt({ bot: THE_ROCK_BIO }),
}



