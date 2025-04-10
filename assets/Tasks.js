const Tasks = [
  {
    id: 1,
    title: "Tap 10 times",
    description: "Tap on the clicker object 10 times",
    count: 10,
    action: "singleClick",
    completed: false,
    color: "red",
  },
  {
    id: 2,
    title: "Double-tap 5 times",
    description: "Double-tap on the clicker 5 times",
    count: 5,
    action: "doubleClick",
    color: "blue",
    completed: false,
  },
  {
    id: 3,
    title: "Long press 3 seconds",
    description: "Hold the clicker for 3 seconds",
    count: 1,
    action: "longPress",
    color: "purple",
    completed: false,
  },
  {
    id: 4,
    title: "Drag the object",
    description: "Drag the clicker around the screen",
    count: 1,
    action: "pan",
    completed: false,
    color: "green",
  },
  {
    id: 5,
    title: "Swipe right",
    description: "Perform a swipe right gesture",
    count: 1,
    action: "flingRight",
    completed: false,
    color: "orange",
  },
  {
    id: 6,
    title: "Swipe left",
    description: "Perform a swipe left gesture",
    count: 1,
    action: "flingLeft",
    completed: false,
    color: "blue",
  },
  {
    id: 7,
    title: "Pinch to resize",
    description: "Use pinch gesture to resize the clicker",
    count: 1,
    action: "pinch",
    completed: false,
    color: "red",
  },
  {
    id: 8,
    title: "Reach 100 points",
    description: "Reach 100 points on the counter",
    count: 100,
    action: "score",
    completed: false,
    color: "orange",
  },
];

export default Tasks;
