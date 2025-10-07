/**
 * DataTable Component Examples
 *
 * Working examples demonstrating DataTable component with TanStack Table.
 * Built on @tanstack/react-table with built-in sorting, filtering, pagination, and column visibility.
 */

import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import {
  DataTable,
  createSelectColumn,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Badge,
} from '@/components';

// Sample data types
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  inStock: boolean;
};

// Sample data
const userData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'pending',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'active',
  },
];

const productData: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    category: 'Electronics',
    price: 999,
    stock: 15,
    inStock: true,
  },
  {
    id: '2',
    name: 'Mouse',
    category: 'Accessories',
    price: 29,
    stock: 50,
    inStock: true,
  },
  {
    id: '3',
    name: 'Keyboard',
    category: 'Accessories',
    price: 79,
    stock: 0,
    inStock: false,
  },
  {
    id: '4',
    name: 'Monitor',
    category: 'Electronics',
    price: 299,
    stock: 8,
    inStock: true,
  },
  {
    id: '5',
    name: 'Headphones',
    category: 'Audio',
    price: 149,
    stock: 25,
    inStock: true,
  },
];

/**
 * Example 1: Basic Table with Sorting
 * Simple table with sortable columns. Click column headers to sort.
 */
export function BasicTableExample() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
  ];

  return <DataTable columns={columns} data={userData} />;
}

/**
 * Example 2: Table with Search Filter
 * Table with a search input to filter by a specific column.
 */
export function TableWithSearchExample() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={userData}
      searchKey="name"
      searchPlaceholder="Search by name..."
    />
  );
}

/**
 * Example 3: Table with Row Selection
 * Table with checkboxes for selecting rows. Shows selection count at bottom.
 */
export function TableWithSelectionExample() {
  const columns: ColumnDef<User>[] = [
    createSelectColumn<User>(),
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
  ];

  return <DataTable columns={columns} data={userData} />;
}

/**
 * Example 4: Table with Custom Cell Rendering
 * Table with custom rendering for status badges and formatted prices.
 */
export function TableWithCustomCellsExample() {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Product',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const price = row.getValue('price') as number;
        return <span>${price.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
    },
    {
      accessorKey: 'inStock',
      header: 'Status',
      cell: ({ row }) => {
        const inStock = row.getValue('inStock') as boolean;
        return (
          <Badge variant={inStock ? 'default' : 'destructive'}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={productData} searchKey="name" />;
}

/**
 * Example 5: Table with Actions Column
 * Table with a dropdown menu for row actions (edit, delete, etc.).
 */
export function TableWithActionsExample() {
  const [data, setData] = useState<User[]>(userData);

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log('Edit user:', id);
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(user.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} searchKey="name" />;
}

/**
 * Example 6: Complete Table with All Features
 * Combines selection, sorting, search, custom cells, and actions.
 */
export function CompleteTableExample() {
  const [data, setData] = useState<User[]>(userData);

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const columns: ColumnDef<User>[] = [
    createSelectColumn<User>(),
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const variant =
          status === 'active'
            ? 'default'
            : status === 'inactive'
              ? 'destructive'
              : 'secondary';
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(user.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search users..."
    />
  );
}
