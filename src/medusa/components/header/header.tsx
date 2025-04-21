import { ActionMenu, ActionMenuProps } from '../action-menu';
import { Button, Heading, Text } from '@medusajs/ui';
import Link, { LinkProps } from 'next/link';
import React, { Fragment } from 'react';

export type HeadingProps = {
  title: string;
  subtitle?: string;
  actions?: (
    | {
        type: 'button';
        props: React.ComponentProps<typeof Button>;
        link?: LinkProps;
      }
    | {
        type: 'action-menu';
        props: ActionMenuProps;
      }
    | {
        type: 'custom';
        children: React.ReactNode;
      }
  )[];
};

export const Header = ({ title, subtitle, actions = [] }: HeadingProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div>
        <Heading level="h2">{title}</Heading>
        {subtitle && (
          <Text className="text-ui-fg-subtle" size="small">
            {subtitle}
          </Text>
        )}
      </div>
      {actions.length > 0 && (
        <div className="flex items-center justify-center gap-x-2">
          {actions.map((action, index) => (
            <Fragment key={index}>
              {action.type === 'button' &&
                (action.link ? (
                  <Link href={action.link?.href || ''} key={index}>
                    <Button {...action.props} size={action.props.size || 'small'}>
                      <>{action.props.children}</>
                    </Button>
                  </Link>
                ) : (
                  <Button {...action.props} size={action.props.size || 'small'} key={index}>
                    <>{action.props.children}</>
                  </Button>
                ))}
              {action.type === 'action-menu' && <ActionMenu {...action.props} />}
              {action.type === 'custom' && action.children}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
