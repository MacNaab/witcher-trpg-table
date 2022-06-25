import { Button, VStack, Tooltip } from '@chakra-ui/react';
import {
  AiOutlineFileText,
  AiOutlineUpSquare,
  AiOutlineEdit,
} from 'react-icons/ai';

const myList = [
  {
    icon: <AiOutlineFileText size={25} />,
    tooltip: 'Menu Pages',
  },
  {
    icon: <AiOutlineUpSquare size={25} />,
    tooltip: 'Menu Ajout',
  },
  {
    icon: <AiOutlineEdit size={25} />,
    tooltip: 'Menu Edition',
  },
];

function MyTooltip(props: any) {
  const { icon, tooltip, n, setPage } = props;
  return (
    <Tooltip label={tooltip} placement="right">
      <Button onClick={() => setPage(n)} variant="outline">
        {icon}
      </Button>
    </Tooltip>
  );
}

export default function Sample({ setPage }: any) {
  return (
    <VStack spacing={5}>
      {myList.map((e, n: number) => (
        <MyTooltip
          key={`VBar#${n}`}
          n={n}
          setPage={setPage}
          icon={e.icon}
          tooltip={e.tooltip}
        />
      ))}
    </VStack>
  );
}
