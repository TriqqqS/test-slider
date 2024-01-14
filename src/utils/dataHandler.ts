export interface MockData {
  id: number;
  types: string;
  img: string;
  title: string;
  date: string;
}

export interface DataItem extends MockData {
  size: string;
}

function dataHandler(data: MockData[]): DataItem[] {
  const updatedData = data.map((item) => {
    let size = "";
    item.title.length <= 35 ? (size = "small") : (size = "big");
    return { ...item, size };
  });
  return updatedData;
}

export default dataHandler;
