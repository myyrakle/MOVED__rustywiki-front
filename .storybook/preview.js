import { withNextRouter } from 'storybook-addon-next-router';
import { muiTheme } from 'storybook-addon-material-ui';
import { addDecorator } from '@storybook/react';
import CustomTheme, { theme } from '../shared/CustomTheme';
import { RecoilRoot } from 'recoil';
import { useDarkMode } from '../hooks/useDarkMode';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [muiTheme(theme)];

addDecorator(
  withNextRouter({
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration, can override any method in the router
  })
);

addDecorator((Story, ctx) => {
  const isDark = ctx?.globals?.backgrounds?.value === '#333333';
  const { setMode } = useDarkMode();
  useEffect(() => {
    setMode(isDark ? 'dark' : 'light');
  }, []);
  return <Story />;
});

addDecorator((Story) => {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <CustomTheme>
          <Story />
        </CustomTheme>
      </QueryClientProvider>
    </RecoilRoot>
  );
});
