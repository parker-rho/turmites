import json
import matplotlib.pyplot as plt

for j in range(1,7):
# Create figure
    plt.figure(figsize=(12, 7))

    # Loop through test1_1.json to test1_5.json
    for i in range(1, 6):

        filename = f"data/test{j}/test{j}_{i}.json"

        # Load JSON
        with open(filename, "r") as f:
            data = json.load(f)

        ants = data["ants"]

        # Extract data
        ticks = []
        genome_means = []

        for ant in ants:
            ticks.append(ant["tick"])
            genome_means.append(ant["genome"]["mean"])

        # Plot this dataset
        plt.scatter(
            ticks,
            genome_means,
            label=f"test{j}_{i}"
        )

    # Labels and formatting
    plt.xlabel("Tick")
    plt.ylabel("Genome Mean")
    plt.title("Genome Means Over Time")

    plt.legend()
    plt.grid(True)

    # Save as PDF
    plt.savefig(f"test{j}_together.pdf")

    # Create a 3x2 grid of subplots
    fig, axes = plt.subplots(3, 2, figsize=(14, 12))

    # Flatten axes for easier indexing
    axes = axes.flatten()

    # Loop through test1_1.json to test1_5.json
    for i in range(1, 6):

        filename = f"data/test{j}/test{j}_{i}.json"

        # Load JSON
        with open(filename, "r") as f:
            data = json.load(f)

        ants = data["ants"]

        # Extract data
        ticks = []
        genome_means = []

        for ant in ants:
            ticks.append(ant["tick"])
            genome_means.append(ant["genome"]["mean"])

        # Plot on subplot
        ax = axes[i - 1]

        ax.scatter(ticks, genome_means)

        ax.set_title(f"test{j}_{i}")
        ax.set_xlabel("Tick")
        ax.set_ylabel("Genome Mean")
        ax.grid(True)

    # Remove unused subplot
    fig.delaxes(axes[5])

    # Improve spacing
    plt.tight_layout()

    # Save as PDF
    plt.savefig(f"test{j}_subplots.pdf")

    # Create figure
    plt.figure(figsize=(12, 7))

    # Loop through test1_1.json to test1_5.json
    for i in range(1, 6):

        filename = f"data/test{j}/test{j}_{i}.json"

        # Load JSON
        with open(filename, "r") as f:
            data = json.load(f)

        ants = data["ants"]

        # Extract data
        ticks = []
        genome_means = []

        for ant in ants:

            tick = ant["tick"]

            # Only include points up to MAX_TICK
            if tick <= 2500:
                ticks.append(tick)
                genome_means.append(ant["genome"]["mean"])


        # Plot this dataset
        plt.scatter(
            ticks,
            genome_means,
            label=f"test{j}_{i}"
        )

    # Labels and formatting
    plt.xlabel("Tick")
    plt.ylabel("Genome Mean")
    plt.title("Genome Means Over Time")

    plt.legend()
    plt.grid(True)

    # Save as PDF
    plt.savefig(f"test{j}_together_abbreviated.pdf")
