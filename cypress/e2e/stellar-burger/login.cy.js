describe('Login to page',() => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    
    it('Авторизация пользователя', () => {
        // Переходим на страницу авторизации
        cy.visit('http://localhost:3000/login');
        
        // Находим и нажимаем на кнопку "Личный кабинет"
        cy.get('[data-cy="profile-btn"]').click();
        
        // Вводим данные пользователя
        cy.get('[data-cy="form-input"]').type('sharliz1202@gmail.com');
        cy.get('[data-cy="form-password"]').type('111111');
        
        // Нажимаем на кнопку "Вход"
        cy.get('[data-cy="login-btn"]').click();
        
    });
})
