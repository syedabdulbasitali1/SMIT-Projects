#include <cs50.h>
#include <stdio.h>
#include <string.h>

// int func(int n){
//     return n % 10;
// }

int toString(long creditNumber){
    char str[20];
    sprintf(str,"%ld", creditNumber);
    int length = strlen(str);

    //check number validity
    int first=str[0]


    return length;
}
int main()
{
    long user_input;
    do
    {
        user_input = get_long("Enter credit card number: ");
        int length = toString(user_input);

    }
    while(user_input < 1 && length == 13  || length == 15 || length == 16);
    // printf("%i\n", length);

}
