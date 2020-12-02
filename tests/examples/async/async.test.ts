import requestPromise from "request-promise-native";
import { Str } from "../../../src/nodes";
import itFilters from "../utils/it-filters";

itFilters("async", __dirname, {
  async Str(value) {
    const data = await requestPromise({ uri: value, json: true });

    return Str(data.places[0]["post code"]);
  },
});
