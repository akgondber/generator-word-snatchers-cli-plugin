import { test } from "uvu";
import * as assert from "uvu/assert";
import <%= classifiedPluginName %> from "../index.js";

let <%= camelizedPluginName %>;

test.before.each(() => {
  <%= camelizedPluginName %> = new <%= classifiedPluginName %>();
});

test("<%= classifiedPluginName %>#build", () => {
  const items = <%= camelizedPluginName %>.build();

  items.map((item) =>
    assert.ok(item.definition.length > 4 && item.word.length > 1)
  );
});

test.run();
