import { useEffect } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { AddColumnDialog } from 'features/task-manager/components/card-view/add-column-dialog';
import { TaskDragOverlay } from 'features/task-manager/components/card-view/tag-drag-overlay';
import { AddTaskDialog } from 'features/task-manager/components/card-view/add-task-dialog';
import { TaskColumn } from 'features/task-manager/components/card-view/task-column';
import { Dialog } from 'components/ui/dialog';
import TaskDetailsView from 'features/task-manager/components/task-details-view/task-details-view';
import { useCardTasks } from 'features/task-manager/hooks/use-card-tasks';
import { useDeviceCapabilities } from 'hooks/use-device-capabilities';

interface TaskCardViewProps {
  task?: any;
  taskService?: any;
  isNewTaskModalOpen?: boolean;
  setNewTaskModalOpen: (isOpen: boolean) => void;
  onTaskAdded?: () => void;
}

export function TaskCardView({
  taskService,
  isNewTaskModalOpen,
  setNewTaskModalOpen,
  onTaskAdded,
}: TaskCardViewProps) {
  const { touchEnabled, screenSize } = useDeviceCapabilities();

  // Better sensor configuration for tablets and mobile devices
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: screenSize === 'tablet' ? 5 : 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: screenSize === 'mobile' ? 250 : 150,
      tolerance: screenSize === 'mobile' ? 5 : 3,
    },
  });

  // Use both sensors for tablets or touch-enabled devices
  const dndSensors = useSensors(
    touchEnabled ? touchSensor : null,
    screenSize === 'tablet' ? mouseSensor : null,
    mouseSensor
  );

  const {
    columns,
    activeColumn,
    activeTask,
    setActiveColumn,
    addColumn,
    renameColumn,
    deleteColumn,
    addTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useCardTasks();

  useEffect(() => {
    const handleSetActiveColumn = (event: Event) => {
      const customEvent = event as CustomEvent;
      const columnId = customEvent.detail;
      setActiveColumn(columnId);
    };

    document.addEventListener('setActiveColumn', handleSetActiveColumn);
    return () => {
      document.removeEventListener('setActiveColumn', handleSetActiveColumn);
    };
  }, [setActiveColumn]);

  return (
    <div className="h-full w-full">
      <DndContext
        sensors={dndSensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        autoScroll={{
          threshold: {
            x: 0.2,
            y: 0.2,
          },
        }}
        measuring={{
          draggable: {
            measure: (element) => element.getBoundingClientRect(),
          },
        }}
      >
        <div
          className={`flex overflow-x-auto p-4 h-full ${touchEnabled ? 'touch-pan-x' : ''}`}
          style={{
            touchAction: touchEnabled ? 'pan-x' : 'auto',
          }}
        >
          <div className="flex space-x-4 min-h-full">
            {columns.map((column) => (
              <TaskColumn
                taskService={taskService}
                key={column.id}
                column={column}
                tasks={column.tasks || []}
                setActiveColumn={setActiveColumn}
                onAddTask={(columnId, content) => addTask(columnId, content)}
                onRenameColumn={(columnId, newTitle) => renameColumn(columnId, newTitle)}
                onDeleteColumn={(columnId) => deleteColumn(columnId)}
                onTaskAdded={onTaskAdded}
              />
            ))}

            <div className="flex items-start pt-10 px-2">
              <AddColumnDialog onAddColumn={(title) => addColumn(title)} />
            </div>
          </div>
        </div>

        <DragOverlay>{activeTask && <TaskDragOverlay activeTask={activeTask} />}</DragOverlay>
      </DndContext>

      <AddTaskDialog
        activeColumn={activeColumn}
        columns={columns}
        onAddTask={(columnId, content) => addTask(columnId, content)}
      />

      <Dialog open={isNewTaskModalOpen} onOpenChange={setNewTaskModalOpen}>
        {isNewTaskModalOpen && (
          <TaskDetailsView
            taskService={taskService}
            onClose={() => setNewTaskModalOpen(false)}
            isNewTaskModalOpen={isNewTaskModalOpen}
            onTaskAddedList={onTaskAdded}
            onTaskAddedCard={(columnId, content) => addTask(columnId, content)}
            setActiveColumn={setActiveColumn}
          />
        )}
      </Dialog>
    </div>
  );
}

export default TaskCardView;
