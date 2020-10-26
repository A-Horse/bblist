import "./KanbanHeaderBar.scss";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { AppButton } from "../../../../../widget/Button";
import { RootState } from "../../../../../redux/reducer";
import { IKanban } from "../../../../../typings/kanban.typing";
import { AppIcon } from "../../../../../widget/Icon";
import { faCog, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { IssueCreatorModal } from "../../../../../components/creators/TaskCreator/IssueCreatorModal";

interface InputProps {
  selectedKanbanId: string;
  projectId: string;
  onOpenSetting: () => void;
}

export function KanbanHeaderBar({
                                  projectId,
                                  selectedKanbanId,
                                  onOpenSetting
                                }: InputProps) {
  const kanban: IKanban | undefined = useSelector(
    (state: RootState) => state.project.kanbanMap[selectedKanbanId]
  );

  const [issueCreatorToggle, setIssueCreatorToggle] = useState(false);

  return (
    <div className="KanbanHeaderBar">
      <div className="KanbanHeaderBar--kanban-name">
        <span style={{ display: "inlineBlock" }}>{kanban ? kanban.name : ""}</span>
        <AppButton title="设置" type="ghost" onClick={onOpenSetting}>
          <AppIcon size="xs" icon={faCog} />
        </AppButton>
      </div>

      <div className="KanbanHeaderBar--operation">
        <AppButton
          backgroundColor="white"
          onClick={() => {
            setIssueCreatorToggle(true);
          }}
        >
          <AppIcon icon={faPlusCircle} />
          新建问题
        </AppButton>
      </div>

      <IssueCreatorModal
        projectId={projectId}
        kanbanId={selectedKanbanId}
        modalVisible={issueCreatorToggle}
        closeModal={() => setIssueCreatorToggle(false)}
      />
    </div>
  );
}
