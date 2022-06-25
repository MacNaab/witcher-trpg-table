import { useState } from 'react';

import { QuestionIcon } from '@chakra-ui/icons';
import { Flex, Select } from '@chakra-ui/react';

// import { PopProps } from '@/utils/AppConfig';
import IconButton from '@/component/iconButton';

import Popover from './popover';

function CustomPop(props: any) {
  const { head, body, footer } = props;
  return (
    <Popover head={head} body={body} footer={footer}>
      <IconButton>{props.children}</IconButton>
    </Popover>
  );
}

export default function Sample(props: any) {
  const { name, label, options } = props.data;
  const [pop, setPop] = useState({
    nom: name,
    desc: label,
    source: 'Livre de Base',
  });
  const handleChange = (event: any) => {
    const { value } = event.target;
    const found = options.find((e: any) => e.nom === value);
    if (found) {
      setPop(found);
    }
  };
  return (
    <Flex>
      <Select
        name={name}
        placeholder={label}
        required
        minWidth={210}
        onChange={handleChange}
      >
        {options?.map((e: any) => (
          <option key={e.nom} value={e.nom}>
            {e.nom}
          </option>
        ))}
      </Select>
      <CustomPop head={pop.nom} body={pop.desc} footer={pop.source}>
        <QuestionIcon className="cursor-pointer" />
      </CustomPop>
    </Flex>
  );
}

export function CtrlSelect(props: any) {
  const { name, label, options } = props.data;
  const { setState } = props;
  const [pop, setPop] = useState({
    nom: name,
    desc: label,
    source: 'Livre de Base',
  });
  const handleChange = (event: any) => {
    const { value } = event.target;
    setState(value);
    const found = options.find((e: any) => e.nom === value);
    if (found) {
      setPop(found);
    }
  };
  return (
    <Flex>
      <Select
        name={name}
        placeholder={label}
        required
        minWidth={210}
        onChange={handleChange}
      >
        {options?.map((e: any) => (
          <option key={e.nom} value={e.nom}>
            {e.nom}
          </option>
        ))}
      </Select>
      <Popover head={pop.nom} body={pop.desc} footer={pop.source}>
        <IconButton>
          <QuestionIcon className="cursor-pointer" />
        </IconButton>
      </Popover>
    </Flex>
  );
}
