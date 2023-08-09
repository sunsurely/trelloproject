const Board = require('../models/board');

class BoardRepository {
  async createBoard(name, color, discription) {
    const result = await Board.create({ name, color, discription });

    return result;
  }

  async getBoardList() {
    const result = await Board.findAll();

    return result;
  }

  async getBoard(id) {
    const result = await Board.findByPk(id);

    return result;
  }

  async updateBoard(id, name, color, discription) {
    const result = await Board.update(
      { name, color, discription },
      {
        where: {
          boardId: id,
        },
      },
    );

    return result;
  }

  async deleteBoard(id) {
    const result = await Board.destroy({
      where: {
        boardId: id,
      },
    });

    return result;
  }
}

module.exports = BoardRepository;
