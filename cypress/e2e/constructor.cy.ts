// по примеру с воркшопа
describe('корректность конструктора', function () {
  beforeEach(() => {
    // Настройка перехвата запросов во всех тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('добавление булки', function () {
    // находим в DOM дереве кнопку с атрибутом data-cy=bun-ingredients, проверяем что в ней есть текст ('Добавить')
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains('Ингредиент 1').should('exist');
  });

  it('добавление игредиента', function () {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=filling-constructor]').as('fillingConstructor');
    cy.get('@fillingConstructor').contains('Ингредиент 2').should('exist');
    cy.get('@fillingConstructor').contains('Ингредиент 4').should('exist');
  });
});

describe('корректность работы модального окна', function () {
  beforeEach(function () {
    // Настройка перехвата запросов во всех тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('проверка открытия модального окна ингредиента', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    //обязательная проверка, что в модальном окне именно тот ингредиент
    cy.get('[data-cy=modal-ingredient]').contains('Ингредиент 1').should('exist');
  });

  it('проверка закрытия по клику на кнопку-крестик', function () {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-close_btn]').click();
    //обязательно проверяем, что окно закрылось
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('проверка закрытия по клику на оверлей', function () {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modalOverlay]').click('left', { force: true });
    // проверяем, что окно закрылось
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('создание заказа', () => {
  beforeEach(() => {
    // Настройка перехвата запросов во всех тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'login.json' });
    // отправка запроса post на создание заказа
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    // очищаем хранилище после каждого теста
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('проверка создания заказа', () => {
    // собираем бургер
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=add-order-btn]').click();

    // проверка того, что в запросе отправляется именно то, что нужно
    cy.wait('@postOrder')
    .its('request.body')
    .should('deep.equal', {
      ingredients: ['1', '2', '4', '1']
    });

    cy.get('[data-cy=order-number]').as('orderNumber');
    cy.get('@orderNumber').contains('67009').should('exist');
    cy.get('[data-cy=modal-close_btn]').as('modalCloseBtn');
    cy.get('@modalCloseBtn').click();
    cy.get('@orderNumber').should('not.exist');
    cy.get('[data-cy=burger-constructor]').as('burger-constructor');
    cy.get('@burger-constructor').contains('Ингредиент 1').should('not.exist');
    cy.get('@burger-constructor').contains('Ингредиент 2').should('not.exist');
    cy.get('@burger-constructor').contains('Ингредиент 4').should('not.exist');
});
});
