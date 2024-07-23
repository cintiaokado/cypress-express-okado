
describe('tarefas', ()=> {

    let testData;

    before(()=> {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

   
    context('cadastro', () => {
        it('deve cadastrar uma nova', ()=> {

            const taskName = 'Estudar para Cypress'
    
            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
    
            
            cy.contains('main div p', taskName)
                .should('be.visible')            
        })    
    
        it('não deve permitir tarefa duplicada', ()=> {
            
            const task = testData.dup
            
            cy.removeTaskByName(task.name)
            //request para excluir tarefa direto na API
            
            //request para cadastrar tarefa direto na API
            cy.postTask(task)
            //// Dado que eu tenho uma tarefa duplicada
            
            // Quando faço o cadastro dessa tarefa
            cy.createTask(task.name)
    
            // Então vejo a mensagem de duplicidade
    
            cy.get('.swal2-html-container')
                    .should('be.visible')     
                    .should('have.text', 'Task already exists!')
    
        })
    
        it('campo obrigatório', ()=> {
            cy.createTask()
    
            cy.isRequired('This is a required field')
        })

    })

    context('atualização', ()=> {
        it('deve concluir uma tarefa', ()=> {
            const task = {
                name: 'Automação mobile',
                is_done: false
            }
            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*="ItemToggle"]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })
    
    context('exclusão', ()=> {
        it('deve remover uma tarefa', ()=> {
            const task = {
                name: 'Estudar cypress',
                is_done: false
            }
            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*="ItemDelete"]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
    
})
