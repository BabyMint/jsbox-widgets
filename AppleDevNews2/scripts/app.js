const api = require("./api");
const emptyWidget = require("./widget/empty");
const smallWidget = require("./widget/small");
const mediumWidget = require("./widget/medium");

exports.init = async() => {
  const items = await fetch();
  $widget.setTimeline(ctx => {
    if (items.length === 0) {
      return emptyWidget();
    }
    switch (ctx.family) {
      case $widgetFamily.small:
        return smallWidget(items);
      case $widgetFamily.medium:
        return mediumWidget(items, 3);
      case $widgetFamily.large:
        return mediumWidget(items, 6);
    }
  });
}

async function fetch() {
  const cache = api.cache();
  if (cache) {
    api.fetch();
    return cache;
  } else {
    return await api.fetch();
  }
}