let state = {};
state.itemsList = [];
state.checkoutList = [];
state.total = 0;

const init = (state) => {
  state.itemsList.push({id: 1, name: 'Item1', price: 10});
  state.itemsList.push({id: 2, name: 'Item2', price: 20});
  state.itemsList.push({id: 3, name: 'Item3', price: 30});
  state.itemsList.push({id: 4, name: 'Item4', price: 40});
  state.itemsList.push({id: 5, name: 'Item5', price: 50});
  state.checkoutList.push({id: 6, name: 'Item6', price: 60});
  state.checkoutList.push({id: 7, name: 'Item7', price: 70});
  render(state);
};

const render = (state) => {
  let $itemsContainer = document.getElementById('itemsContainer');
  let $checkoutContainer = document.getElementById('checkoutContainer');
  $itemsContainer.innerHTML = '';
  $checkoutContainer.innerHTML = '';
  renderList($itemsContainer, state.itemsList);
  renderList($checkoutContainer, state.checkoutList);
  renderTotal();
};

const renderList = ($container, itemsList) => {
  itemsList.forEach(item => {
    $container.appendChild(createItem(item, $container.id));
  });
};

const renderTotal = () => {
  let $checkoutFooter = document.getElementById('checkoutFooter');
  $checkoutFooter.innerHTML = calculateTotal();
};

const createItem = (item, containerName) => {
  let $item = document.createElement('div');

  $item.innerHTML = item.name + '<br><br>' + item.price;
  $item.classList.add('item');
  $item.dataset.id = item.id;
  $item.dataset.price = item.price;

  if (containerName === 'itemsContainer') {
    $item.classList.add('col-sm-3');
    $item.addEventListener('click', addToCheckout);
  } else {
    $item.classList.add('col-sm-8');
    $item.addEventListener('click', removeFromCheckout);
  }
  return $item;
};

const addToCheckout = (e) => {
  let newState = Object.assign({}, state);
  let $item = e.target;
  let id = $item.dataset.id;
  let checkoutItemIndex =
    newState.itemsList
      .map(item => item.id)
      .indexOf(parseInt(id, 10));

  let checkoutItem = newState.itemsList[checkoutItemIndex];
  newState.itemsList = newState.itemsList.filter(item => item.id !== checkoutItem.id);
  newState.checkoutList.push(checkoutItem);
  state = Object.assign({}, newState);
  render(state);
};

const removeFromCheckout = (e) => {
  let newState = Object.assign({}, state);
  let $item = e.target;
  let id = $item.dataset.id;
  let checkoutItemIndex =
    newState.checkoutList
      .map(item => item.id)
      .indexOf(parseInt(id, 10));

  let checkoutItem = newState.checkoutList[checkoutItemIndex];
  newState.checkoutList = newState.checkoutList.filter(item => item.id !== checkoutItem.id);
  newState.itemsList.push(checkoutItem);
  state = Object.assign({}, newState);
  render(state);
};

const calculateTotal = () => {
  return state.checkoutList
    .map(item => item.price)
    .reduce((prev, curr) => {
      return prev + curr;
    }, 0);
};

init(state);
