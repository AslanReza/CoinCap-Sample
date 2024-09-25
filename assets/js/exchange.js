let exchangesTable = document.querySelector(".exchange_table");
let exchangesTableRow = document.querySelector(".exchange_table_row");

function renderExchange(data) {
  let exchangesTableRow = document.createElement("div");
  exchangesTableRow.classList.add("exchange_table_row");

  let rank = document.createElement("div");
  rank.textContent = data.rank;
  rank.classList.add("row_items");
  rank.classList.add("rank_row");

  let nameContainer = document.createElement("div");
  nameContainer.textContent = data.name;
  nameContainer.classList.add("row_items");
  nameContainer.classList.add("name_row");

  let tradingPairs = document.createElement("div");
  tradingPairs.textContent = data.tradingPairs;
  tradingPairs.classList.add("row_items");
  tradingPairs.classList.add("trading_row");

  let topPair = document.createElement("div");
  topPair.textContent = "BTC/USDT";
  topPair.classList.add("row_items");
  topPair.classList.add("top_row");

  let volumeUsd = document.createElement("div");
  volumeUsd.textContent = numeral(data.volumeUsd).format("($0.00a)");
  volumeUsd.classList.add("row_items");
  volumeUsd.classList.add("volume_row");

  let percentTotal = document.createElement("div");
  percentTotal.textContent = numeral(data.percentTotalVolume / 100).format(
    "(0.00%)"
  );
  percentTotal.classList.add("row_items");
  percentTotal.classList.add("total_row");

  let socketUnit = document.createElement("div");
  socketUnit.dataset = data.socket;
  socketUnit.classList.add("row_items");
  socketUnit.classList.add("status_row");
  let socketUnitColor = document.createElement("div");
  socketUnitColor.classList.add("socket");
  if (data.socket === true) {
    socketUnitColor.classList.add("green");
    socketUnitColor.classList.add("pulse_green");
  } else {
    socketUnitColor.classList.add("red");
    socketUnitColor.classList.add("pulse_red");
  }

  socketUnit.appendChild(socketUnitColor);

  exchangesTableRow.appendChild(rank);
  exchangesTableRow.appendChild(nameContainer);
  exchangesTableRow.appendChild(tradingPairs);
  exchangesTableRow.appendChild(topPair);
  exchangesTableRow.appendChild(volumeUsd);
  exchangesTableRow.appendChild(percentTotal);
  exchangesTableRow.appendChild(socketUnit);

  exchangesTable.appendChild(exchangesTableRow);
}

// FETCH
let exchangesBaseUrl = "https://api.coincap.io/v2";
let exchangesCurrentOffset = 0;
async function getExchangesList() {
  let AssetsUrl =
    "https://api.coincap.io/v2/exchanges?offset=" +
    exchangesCurrentOffset +
    "&limit=20";
  let response = await fetch(AssetsUrl);
  let body = await response.json();
  return body.data;
}
async function renderExchangesList() {
  let List = await getExchangesList();
  for (let i = 0; i < List.length; i++) {
    let item = List[i];
    renderExchange(item);
  }
}

// VIEW MORE BUTTON
let moreButtonExchanges = document.querySelector("#more");
moreButtonExchanges.addEventListener("click", function (e) {
e.preventDefault();
  exchangesCurrentOffset += 20;
  renderExchangesList();
});

// LOAD
function renderError(message) {
  let errorContainer = document.createElement("div");
  errorContainer.textContent = message;
  errorContainer.classList.add("error");

  exchangesTableRow.appendChild(errorContainer);
}

function renderLoadingExchanges() {
  let loadingContainer = document.createElement("div");
  loadingContainer.textContent = "Loading....";
  loadingContainer.classList.add("loading");

  exchangesTableRow.appendChild(loadingContainer);
}

function removeLoadingExchanges() {
  let loadingEl = document.querySelector(".loading");
  exchangesTableRow.removeChild(loadingEl);
}

// TEST & ERROR
renderLoadingExchanges();
renderExchangesList()
  .catch(function (error) {
    renderError(error.toString());
  })
  .finally(function () {
    removeLoadingExchanges();
  });