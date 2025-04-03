import Play from "../assets/Icon/Play.svg";
import TaskList from "../assets/Icon/TaskList.svg";

export const LoadIcons = () => {
  return [
    { name: "Play", Icon: Play },
    { name: "TaskList", Icon: TaskList },
  ];
};

export const GetIcon = (icon, size, stroke, fill) => {
  const IcoEntry = LoadIcons().find((ico) => ico.name === icon);
  const Icon = IcoEntry?.Icon;
  return Icon ? (
    <Icon width={size} height={size} stroke={stroke} fill={fill} />
  ) : null;
};
