export const config = {
  env: "local",
  LOCAL_API_URL: "localhost:3000",
  API_URL: "cai-rarity.netlify.app",
  COLLECTION_NAME: "Caiman",
  COLLECTION_TITLE: "Cai NFT Rarity Score",
  COLLECTION_DESCRIPTION: "A NFT collection on Echelon Blockchain",
  COLLECTION_IMG_LINK:
    "https://caimancoin.com/wp-content/uploads/2022/06/logss.png",
  STARTING_INDEX: 0,
  CONTRACT: {
    // if you're not sure, set CONTRACT: {}, will remove opensea link
    CHAIN: "ethereum",
    ADDRESS: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", //note: for solana these values change, so currently not supported
  },
  WEIGHTS: {},
};
