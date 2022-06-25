import {
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Text,
} from '@chakra-ui/react';

export default function Sample(props: any) {
  const { head, body, footer } = props;
  return (
    <Popover>
      <PopoverTrigger>
        <Center>{props.children}</Center>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{head}</PopoverHeader>
        <PopoverBody>
          {Array.isArray(body)
            ? body.map((e: any) => <Text key={e}>{e}</Text>)
            : body}
        </PopoverBody>
        {footer ? <PopoverFooter>{footer}</PopoverFooter> : null}
      </PopoverContent>
    </Popover>
  );
}
