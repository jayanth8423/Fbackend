import random

class VacuumEnvironment:
    def __init__(self, rows, cols):
        # Initialize a grid with random "Clean" or "Dirty" states
        self.grid = [[random.choice(["Clean", "Dirty"]) for _ in range(cols)] for _ in range(rows)]
        self.rows = rows
        self.cols = cols

    def display_environment(self):
        for row in self.grid:
            print(" | ".join(row))
        print()

    def is_dirty(self, x, y):
        return self.grid[x][y] == "Dirty"

    def clean_cell(self, x, y):
        self.grid[x][y] = "Clean"

class VacuumAgent:
    def __init__(self, environment):
        self.environment = environment
        self.x, self.y = 0, 0  # Start at the top-left corner

    def move(self):
        # Move to the next cell (right, down, left, or up in a zig-zag pattern)
        if self.y < self.environment.cols - 1:
            self.y += 1
        elif self.x < self.environment.rows - 1:
            self.x += 1
            self.y = 0

    def act(self):
        if self.environment.is_dirty(self.x, self.y):
            print(f"Cleaning cell ({self.x}, {self.y})")
            self.environment.clean_cell(self.x, self.y)
        else:
            print(f"Moving from cell ({self.x}, {self.y})")
            self.move()

def main():
    rows, cols = 4, 4  # Define the size of the environment
    environment = VacuumEnvironment(rows, cols)
    agent = VacuumAgent(environment)

    print("Initial Environment:")
    environment.display_environment()

    # Simulate the agent's actions
    steps = rows * cols
    for _ in range(steps):
        agent.act()
        environment.display_environment()

if __name__ == "__main__":
    main()
