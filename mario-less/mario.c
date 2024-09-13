#include <cs50.h>
#include <stdio.h>

void print_row(int bricks);

int main(void)
{
    // Prompt the user for the pyramid's height
    int height;
    do{
        height = get_int("Height: ");
    }
    while(height < 3 || height > 8);

    // Print a pyramid of that height
    for(int i = 0; i < height; i++)
    {
        // Print row
        for(int j = 0; j < i+1; j++)
        {
            for(int k = (height-1); k > 0;k--)
            {
                printf(".");
            }
            print_row(i);
        }
        printf("\n");

    }
}

// Function to print row
void print_row(int bricks)
{
    printf("#");
}
