import store from "./store";

export function addvalue(data: any) {
  return {
    type: "ADD",
    data,
  };
}

export function asyncAdd(data: any): any {
  return async function (dispatch: any) {
    dispatch(addvalue(data));
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: data,
      }),
    });
    const resJson = await res.json();
    console.log(resJson.choices[0].message);
    if (resJson) {
      dispatch(addvalue([...data, resJson.choices[0].message]));
      console.log(store.getState());
    }
  };
}
