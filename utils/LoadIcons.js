import Play from "../assets/Icon/Play.svg";
import TaskList from "../assets/Icon/TaskList.svg";
import doubleClick from "../assets/Icon/doubleClick.svg";
import flingLeft from "../assets/Icon/flingLeft.svg";
import flingRight from "../assets/Icon/flingRight.svg";
import longPress from "../assets/Icon/longPress.svg";
import pan from "../assets/Icon/pan.svg";
import pinch from "../assets/Icon/pinch.svg";
import score from "../assets/Icon/score.svg";
import singleClick from "../assets/Icon/singleClick.svg";

export const LoadIcons = () => {
  return [
    { name: "Play", Icon: Play },
    { name: "TaskList", Icon: TaskList },
    { name: "pan", Icon: pan },
    { name: "pinch", Icon: pinch },
    { name: "singleClick", Icon: singleClick },
    { name: "longPress", Icon: longPress },
    { name: "score", Icon: score },
    { name: "flingRight", Icon: flingRight },
    { name: "flingLeft", Icon: flingLeft },
    { name: "doubleClick", Icon: doubleClick },
  ];
};

export const GetIcon = (icon, size, stroke, fill) => {
  const IcoEntry = LoadIcons().find((ico) => ico.name === icon);
  const Icon = IcoEntry?.Icon;
  return Icon ? (
    <Icon width={size} height={size} stroke={stroke} fill={fill} />
  ) : null;
};
