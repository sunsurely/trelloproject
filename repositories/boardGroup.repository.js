const BoardGroup = require('../models/boardGroup');

class BoardGroupRepository {
  // 보드에 멤버로 참여시키는 기능
  // 보드를 생성할 때 보드 생성자가 보드 멤버로 들어가기 때문에 트랜잭션으로 처리
  inviteBoardGroupMember = async (boardId, userId, permission, t) => {
    let result;
    // console.log(`boardId: ${boardId}`);
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

  // 보드 멤버 목록 보여주는 기능
  getBoardGroupMember = async (boardId, userId) => {
    const user = await BoardGroup.findOne({
      where: { boardId, collaborator: userId },
    });

    return user;
  };

  // 보드 멤버 권한 수정
  modifyBoardGroupMemberPermission = async (boardId, userId, permission) => {
    const result = await BoardGroup.update(
      { permission },
      { where: { boardId, collaborator: userId } },
    );

    return result;
  };

  // 보드 멤버 삭제
  deleteBoardGroupMember = async (boardId, userId) => {
    const result = await BoardGroup.destroy({
      where: { boardId, collaborator: userId },
    });

    return result;
  };
}

module.exports = BoardGroupRepository;
