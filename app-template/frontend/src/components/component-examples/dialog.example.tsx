/**
 * Dialog Component Examples
 *
 * This file contains multiple working examples of the Dialog component for modal interactions.
 * Copy the example closest to your use case and adapt the content.
 */

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '@/components';

// =============================================================================
// Example 1: Basic Dialog
// Use for: Simple modal dialogs with title, description, and actions
// =============================================================================

export function BasicDialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a basic dialog with a title, description, and action
            buttons.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Example 2: Controlled Dialog
// Use for: Programmatic control over dialog open/close state
// =============================================================================

export function ControlledDialogExample() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    // Perform action
    console.log('Confirmed');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Controlled Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
          <DialogDescription>
            This dialog state is controlled by React state, allowing
            programmatic control.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Example 3: Confirmation Dialog
// Use for: Delete confirmations, destructive actions
// =============================================================================

export function ConfirmationDialogExample() {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    // Perform delete action
    console.log('Item deleted');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the item
            from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Example 4: Form Dialog
// Use for: Collecting user input in a modal
// =============================================================================

export function FormDialogExample() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email });
    setOpen(false);
    setName('');
    setEmail('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Enter the user details below. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Example 5: Dialog Without Close Button
// Use for: Forcing user decision, preventing accidental dismissal
// =============================================================================

export function NoCloseButtonDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Important Action</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Important Decision</DialogTitle>
          <DialogDescription>
            Please make a choice. You must select one of the options below.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Decline
          </Button>
          <Button onClick={() => setOpen(false)}>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Example 6: Information Dialog
// Use for: Displaying information, help text, instructions
// =============================================================================

export function InformationDialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Learn More</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How It Works</DialogTitle>
          <DialogDescription>
            Here's a detailed explanation of how this feature works.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h4 className="font-medium mb-2">Step 1</h4>
            <p className="text-sm text-muted-foreground">
              First, configure your settings in the main panel.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Step 2</h4>
            <p className="text-sm text-muted-foreground">
              Next, review the changes in the preview window.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Step 3</h4>
            <p className="text-sm text-muted-foreground">
              Finally, click save to apply your changes.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Example 7: Loading State Dialog
// Use for: Showing progress, async operations
// =============================================================================

export function LoadingDialogExample() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Process Data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Process Data</DialogTitle>
          <DialogDescription>
            {loading
              ? 'Processing your request...'
              : 'Click process to start the operation.'}
          </DialogDescription>
        </DialogHeader>
        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processing...' : 'Process'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Example 8: Multi-Step Dialog
// Use for: Wizards, multi-step forms, guided processes
// =============================================================================

export function MultiStepDialogExample() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleFinish = () => {
    console.log('Wizard completed');
    setOpen(false);
    setStep(1);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => {
        setOpen(isOpen);
        if (!isOpen) setStep(1);
      }}
    >
      <DialogTrigger asChild>
        <Button>Start Wizard</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Setup Wizard - Step {step} of 3</DialogTitle>
          <DialogDescription>
            {step === 1 && 'Configure basic settings'}
            {step === 2 && 'Set up advanced options'}
            {step === 3 && 'Review and confirm'}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm">Step 1: Basic configuration goes here.</p>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm">Step 2: Advanced options go here.</p>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-sm">Step 3: Review your settings.</p>
            </div>
          )}
        </div>
        <DialogFooter>
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleFinish}>Finish</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
