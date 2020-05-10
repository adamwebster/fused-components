import React from 'react';
import { DarkModeWrapper } from '../common/styles';
import { Button } from '../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FCThemeProvider } from '../theming/FCTheme';

export const ButtonDarkMode = () => {
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <Button>Button</Button>
        <Button primary>Button</Button>
        <Button isLoading loadingIcon={<FontAwesomeIcon spin icon="spinner" />}>
          Button
        </Button>
        <Button primary isLoading loadingIcon={<FontAwesomeIcon spin icon="spinner" />}>
          Button
        </Button>
        <Button as="a">Button</Button>
        <br />
        <br />
        <Button fcStyle="danger">Button</Button>
        <Button fcStyle="danger" primary>
          Button
        </Button>
        <Button fcStyle="danger" icon="no-entry-circle">
          Button
        </Button>
        <Button fcStyle="danger" icon="no-entry-circle" primary>
          Button
        </Button>
        <Button as="a" fcStyle="danger" icon="no-entry-circle">
          Button
        </Button>

        <br />
        <br />
        <Button fcStyle="warning">Button</Button>
        <Button fcStyle="warning" primary>
          Button
        </Button>
        <Button fcStyle="warning" icon="exclamation-circle">
          Button
        </Button>
        <Button fcStyle="warning" icon="exclamation-circle" primary>
          Button
        </Button>
        <Button as="a" fcStyle="warning" icon="exclamation-circle">
          Button
        </Button>
        <br />
        <br />
        <Button fcStyle="info">Button</Button>
        <Button fcStyle="info" primary>
          Button
        </Button>
        <Button fcStyle="info" icon="info-circle">
          Button
        </Button>
        <Button fcStyle="info" icon="info-circle" primary>
          Button
        </Button>
        <Button as="a" fcStyle="info" icon="info-circle">
          Button
        </Button>
        <br />
        <br />
        <Button fcStyle="success">Button</Button>
        <Button fcStyle="success" primary>
          Button
        </Button>
        <Button fcStyle="success" icon="check-circle">
          Button
        </Button>
        <Button fcStyle="success" icon="check-circle" primary>
          Button
        </Button>
        <Button as="a" fcStyle="success" icon="check-circle">
          Button
        </Button>
        <br />
        <br />
        <Button fcStyle="success" disabled>
          Button
        </Button>
        <Button fcStyle="success" primary disabled>
          Button
        </Button>
        <Button fcStyle="success" icon="check-circle" disabled>
          Button
        </Button>
        <Button fcStyle="success" icon="check-circle" primary disabled>
          Button
        </Button>
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
