import { Heading, Text } from '@chakra-ui/react';

import { AppConfig } from '@/utils/AppConfig';

export default function foot() {
  return (
    <div className="border-t border-gray-300 py-8">
      <Heading>Un problème ?</Heading>
      <Text>
        N&apos;hésitez pas à m&apos;en faire part via{' '}
        <a
          target="_blank"
          href="https://github.com/MacNaab/Random-Tables/issues"
          rel="noreferrer"
        >
          Github
        </a>
        ,{' '}
        <a
          target="_blank"
          href="https://www.reddit.com/user/mac-hareng"
          rel="noreferrer"
        >
          Reddit
        </a>{' '}
        ou{' '}
        <a target="_blank" href="https://discord.gg/zTDwBJA" rel="noreferrer">
          discord
        </a>{' '}
        @Mac Hareng.
      </Text>
      <div className="py-4 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
        <span role="img" aria-label="Love">
          ♥
        </span>{' '}
        by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
      </div>
    </div>
  );
}
