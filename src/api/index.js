import axios from "axios";

export const translateText = async (text = "") => {
  try {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        "api-version": "3.0",
        to: "es",
        textType: "plain",
        profanityAction: "NoAction",
      },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "x-rapidapi-key": "8a0801db53msh529222c9b37d2a2p18c813jsn7d3909ddd3f5",
      },
      data: [
        {
          Text: text,
        },
      ],
    };

    const { data } = await axios.request(options);

    return data[0].translations[0].text;
  } catch (error) {
    console.error(error);
    return text;
  }
};

export const getCalculatorApi = async (fname = "", sname = "") => {
  const options = {
    method: "GET",
    url: "https://love-calculator.p.rapidapi.com/getPercentage",
    params: { fname, sname },
    headers: {
      "x-rapidapi-host": "love-calculator.p.rapidapi.com",
      "x-rapidapi-key": "8a0801db53msh529222c9b37d2a2p18c813jsn7d3909ddd3f5",
    },
  };

  try {
    const { data } = await axios.request(options);

    const result = await translateText(data.result);
    const percentage = data.percentage;

    return {
      result,
      percentage,
    };
  } catch (error) {
    console.log(error);
    return {
      result: 0,
      percentage: "Upps ha ocurrido un error, intente mas tarde!!",
    };
  }
};
