import React from "react";
import { useScore } from "../components/ScoreContext";
import styled from "styled-components/native";
import Tasks from "../assets/Tasks";
import ProgressBar from "react-native-progress/Bar"; // Імпорт прогрес-бару
import { GetIcon } from "../utils/LoadIcons";

export default function TaskList() {
  const { actions, score } = useScore();

  return (
    <Container>
      {Tasks.map((task) => {
        const completed =
          task.action === "score"
            ? score >= task.count
            : (actions[task.action] || 0) >= task.count;

        const progress =
          task.action === "score"
            ? score / task.count
            : (actions[task.action] || 0) / task.count;

        return (
          <TaskItem key={task.id} completed={completed}>
            <TaskIcon>
              {GetIcon(task.action, 20, task.color, task.color)}
            </TaskIcon>
            <InfoContainer>
              <Title>{task.title}</Title>
              <TaskDescription>{task.description}</TaskDescription>
              {task.count > 1 && (
                <ProgressContainer>
                  <ProgressBarContainer>
                    <ProgressBar
                      progress={Math.min(progress, 1)}
                      width={230}
                      height={4}
                      color="orange"
                      unfilledColor="#e0e0e0"
                      borderWidth={0}
                    />
                  </ProgressBarContainer>
                  <TaskProgress>
                    {!completed ? task.action === "score"
                      ? score
                      : actions[task.action] || 0 : task.count}{" "}
                    /{task.count}
                  </TaskProgress>
                </ProgressContainer>
              )}
            </InfoContainer>
          </TaskItem>
        );
      })}
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  padding: 30px 20px 0 20px;
  background: #f8f9fa;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const TaskIcon = styled.Text`
  padding: 5px;
  background-color: rgba(97, 84, 200, 0.26);
  border-radius: 30px;
  margin-right: 10px;
`;

const TaskItem = styled.View`
  padding: 10px;
  background: ${(props) => (props.completed ? "#d4edda" : "white")};
  border-radius: 5px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

const TaskDescription = styled.Text`
  font-size: 14px;
`;

const InfoContainer = styled.View`
  flex-direction: column;
`;

const TaskProgress = styled.Text`
  font-size: 14px;
  color: gray;
`;

const ProgressContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ProgressBarContainer = styled.View`
  margin-top: 10px;
  justify-content: space-between;
  margin-right: 5px;
`;
