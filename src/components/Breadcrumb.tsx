'use client';

import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';

interface IProps {
  breadcrumbs: Array<{ name: string; href?: string }>;
}

const Breadcrumb = ({ breadcrumbs }: IProps) => {
  return (
    <Breadcrumbs className="mb-5 hidden md:block" size="lg">
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem
          key={index}
          href={breadcrumb.href}
          className="overflow-hidden"
        >
          <span className="text-ellipsis overflow-hidden">
            {breadcrumb.name}
          </span>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
