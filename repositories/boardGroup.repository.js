const BoardGroup = require('../models/boardGroup');

// board 테이블에 url 속성도 넣을까?
class BoardGroupRepository {
  // 보드에 멤버로 참여시키는 기능
  inviteBoardGroupMember = async (boardId, userId, permission, t) => {
    let result;
    console.log(`boardId: ${boardId}`);
    if (!t) {
      result = await BoardGroup.create({
        boardId,
        collaborator: userId,
        permission,
      });
    } else {
      result = await BoardGroup.create(
        {
          boardId,
          collaborator: userId,
          permission,
        },
        { transaction: t },
      );
    }

    return result;
  };

  // 보드에 참가해있는 인원 조회하는 기능
  getBoardGroupList = async (boardId) => {
    const result = await BoardGroup.findAll({ where: { boardId } });

    return result;
  };

  getBoardGroupMember = async (boardId, userId) => {
    const user = await BoardGroup.findOne({
      where: { boardId, collaborator: userId },
    });

    return user;
  };

  modifyBoardGroupMemberPermission = async (boardId, userId, permission) => {
    const result = await BoardGroup.update(
      { permission },
      { where: { boardId, collaborator: userId } },
    );

    return result;
  };

  deleteBoardGroupMember = async (boardId, userId) => {
    const result = await BoardGroup.destroy({
      where: { boardId, collaborator: userId },
    });

    return result;
  };
}

module.exports = BoardGroupRepository;
