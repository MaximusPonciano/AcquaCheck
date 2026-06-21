'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const questions = [
      // Tobogã Insano (atração 1)
      { attraction_id: 1, question: 'O sensor de fluxo de água está funcionando?', active: true },
      { attraction_id: 1, question: 'As juntas do tobogã estão lisas e sem frestas?', active: true },
      { attraction_id: 1, question: 'Há danos na fibra de vidro ou superfície de contato?', active: true },
      { attraction_id: 1, question: 'Os sistemas de parada de emergência estão operacionais?', active: true },
      { attraction_id: 1, question: 'O tubo possui válvulas de bloqueio manual?', active: true },
      { attraction_id: 1, question: 'Há acúmulo de algas ou depósitos no interior?', active: true },

      // Piscina de Ondas (atração 2)
      { attraction_id: 2, question: 'O gerador de ondas está operando sem ruídos anormais?', active: true },
      { attraction_id: 2, question: 'Os botões de parada de emergência estão acessíveis?', active: true },
      { attraction_id: 2, question: 'Os flutuadores de segurança estão ao redor da piscina?', active: true },
      { attraction_id: 2, question: 'A profundidade é mantida conforme especificação?', active: true },
      { attraction_id: 2, question: 'O filtro de água está limpo e funcionando?', active: true },
      { attraction_id: 2, question: 'Há rachaduras nas paredes ou fundo da piscina?', active: true },

      // Rio Lento (atração 3)
      { attraction_id: 3, question: 'O fluxo de água está regulado corretamente?', active: true },
      { attraction_id: 3, question: 'Os flutuadores estão em bom estado de conservação?', active: true },
      { attraction_id: 3, question: 'Há objetos soltos ou obstáculos no leito?', active: true },
      { attraction_id: 3, question: 'A qualidade da água está dentro dos padrões?', active: true },
      { attraction_id: 3, question: 'As laterais estão seguras sem protuberâncias?', active: true },
      { attraction_id: 3, question: 'O sistema de drenagem está funcionando?', active: true },

      // Escorrega Misterioso (atração 4)
      { attraction_id: 4, question: 'A estrutura está firme e sem oscilações?', active: true },
      { attraction_id: 4, question: 'Os degraus estão antiderrapantes?', active: true },
      { attraction_id: 4, question: 'Há fissuras ou lascas no material?', active: true },
      { attraction_id: 4, question: 'O escorregador está hidratado (molhado)?', active: true },
      { attraction_id: 4, question: 'Os corrimãos estão seguros e bem fixos?', active: true },
      { attraction_id: 4, question: 'A base de recebimento tem colchonetes?', active: true },

      // Piscina Infantil (atração 5)
      { attraction_id: 5, question: 'A profundidade máxima não ultrapassa 60cm?', active: true },
      { attraction_id: 5, question: 'Os brinquedos flutuantes estão seguros?', active: true },
      { attraction_id: 5, question: 'O piso antiderrapante está em bom estado?', active: true },
      { attraction_id: 5, question: 'A qualidade da água está apropriada?', active: true },
      { attraction_id: 5, question: 'Há salva-vidas presente na área?', active: true },
      { attraction_id: 5, question: 'Os drenos estão desimpedidos?', active: true },

      // Jacuzzi Tropical (atração 6)
      { attraction_id: 6, question: 'A temperatura está entre 35-40°C?', active: true },
      { attraction_id: 6, question: 'Os jatos de hidromassagem estão funcionando?', active: true },
      { attraction_id: 6, question: 'O sistema de aquecimento está operacional?', active: true },
      { attraction_id: 6, question: 'Há vazamentos visíveis?', active: true },
      { attraction_id: 6, question: 'O nível de cloro está adequado?', active: true },
      { attraction_id: 6, question: 'A estrutura não apresenta danos?', active: true },

      // Toboágua Radical (atração 7)
      { attraction_id: 7, question: 'A estrutura de suporte está firme?', active: true },
      { attraction_id: 7, question: 'Os tubos estão livres de obstáculos?', active: true },
      { attraction_id: 7, question: 'Há luzes de emergência funcionando?', active: true },
      { attraction_id: 7, question: 'O sistema de frenagem está operacional?', active: true },
      { attraction_id: 7, question: 'A zona de chegada possui colchões de segurança?', active: true },
      { attraction_id: 7, question: 'Não há identificações de perigo danificadas?', active: true },

      // Piscina de Mergulho (atração 8)
      { attraction_id: 8, question: 'A profundidade mínima é mantida (mínimo 2m)?', active: true },
      { attraction_id: 8, question: 'Os trampolins estão seguros e sem fissuras?', active: true },
      { attraction_id: 8, question: 'A escada de acesso está segura?', active: true },
      { attraction_id: 8, question: 'Há linhas de profundidade visíveis?', active: true },
      { attraction_id: 8, question: 'O fundo está limpo e visível?', active: true },
      { attraction_id: 8, question: 'Os salva-vidas estão posicionados adequadamente?', active: true }
    ];

    const timestampedQuestions = questions.map(q => ({
      ...q,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('questions', timestampedQuestions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questions', null, {});
  }
};
