// по примеру с воркшопа
describe('корректность конструктора', function() {
  beforeEach(() => {
    // Настройка перехвата запросов во всех тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('добавление булки', function() {
    // находим в DOM дереве кнопку с атрибутом data-cy=bun-ingredients, проверяем что в ней есть текст ('Добавить')
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]').contains("Ингредиент 1").should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains("Ингредиент 1").should('exist');
  });

  it('добавление игредиента', function() {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=filling-constructor]').as('fillingConstructor');
    cy.get('@fillingConstructor').contains('Ингредиент 2').should('exist');
    cy.get('@fillingConstructor').contains('Ингредиент 4').should('exist');
  })

});
