// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import punks from '../../data/collection.json';

const get_all_traits = () => {
  let all_traits = {};
  for (let i = 0; i < punks.length; i++) {
    let punk = punks[i];
    let { attributes } = punk;
    for (let j = 0; j < attributes.length; j++) {
      let attribute = attributes[j];
      if (attribute) {
        let { trait_type, value } = attribute;
        if (trait_type in all_traits) {
          // trait = type,gender, beard
          if (value in all_traits[trait_type]) {
            all_traits[trait_type][value]++;
          } else {
            all_traits[trait_type][value] = 1;
          }
        } else {
          all_traits[trait_type] = { [value]: 1 }
        }

      }
    }
  }
  console.log(all_traits);
  return all_traits;
}

const get_trait_rarity_score = (trait_type, all_traits) => {
  let sum = 0;
  for (let i = 0; i < Object.keys(all_traits[trait_type]).length; i++) {
    let val = Object.keys(all_traits[trait_type])[0]
    sum += all_traits[trait_type][val]
  }
  return sum;
}

const set_missing_traits = (punk, missing_traits, all_traits) => {
  // calculate rarity score for missing traits
  punk['missing_traits'] = {};
  for (let i = 0; i < missing_traits.length; i++) {
    let missing_trait = missing_traits[i];
    let rarity_score = get_trait_rarity_score(missing_trait, all_traits);
    console.log(missing_trait, rarity_score);
    punk['missing_traits'][missing_trait] =  rarity_score
  }
}

const set_trait_rarity = (punk, all_traits) => {
  let { attributes } = punk;
  let missing_traits = Object.keys(all_traits);
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    if (attribute) {
      let { trait_type, value } = attribute;
      attribute['trait_count'] = all_traits[trait_type][value];
      // remove traits that are present
      missing_traits = missing_traits.filter(trait => trait !== trait_type);
    }
  }
  set_missing_traits(punk, missing_traits, all_traits);
}

const set_punk_rarity = (punk, all_traits) => {
  let sumoftraits = 10000; //assuming
  let { attributes } = punk;
  let rarity_score = 0;
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    attribute['rarity_score'] = 1 / (attribute['trait_count'] / sumoftraits);
    rarity_score += attribute['rarity_score'];
  }
  punk['rarity_score'] = rarity_score;
}

const getPunk = (id) => {
  // Retrieve punk for id
  // Precompute the frequency of each trait
  let all_traits = get_all_traits();
  let punk = punks[id];
  set_trait_rarity(punk, all_traits);
  set_punk_rarity(punk, all_traits);
  return { ...punk };
}

export default function punkAPI(req, res) {
  const { id } = req.query
  const punk = getPunk(id)
  res.status(200).json({ punk })
}