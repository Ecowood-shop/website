from rest_framework.response import Response
from rest_framework import status


def authentication(language):
    if language == 'GEO':
        return Response({'საჭიროა ავტორიზაცია!'}, status=status.HTTP_401_UNAUTHORIZED)
    elif language == 'ENG':
        return Response({'Unauthenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    elif language == 'RUS':
        return Response({'Требуется Авторизация!'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'Unauthenticated!'}, status=status.HTTP_401_UNAUTHORIZED)


def no_items(language):
    if language == 'GEO':
        return Response({'შეკვეთა ცარიელია'}, status=status.HTTP_400_BAD_REQUEST)
    elif language == 'ENG':
        return Response({'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    elif language == 'RUS':
        return Response({'Заказ пуст'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'No Order Items!'}, status=status.HTTP_400_BAD_REQUEST)


def out_of_stock(language):
    if language == 'GEO':
        return Response({'მარაგში არ არის'}, status=status.HTTP_400_BAD_REQUEST)
    elif language == 'ENG':
        return Response({'Out Of Stock'}, status=status.HTTP_400_BAD_REQUEST)
    elif language == 'RUS':
        return Response({'Распродано'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'Out Of Stock'}, status=status.HTTP_400_BAD_REQUEST)


def order_not_exist(language):
    if language == 'GEO':
        return Response({'შეკვეთა ვერ მოიძებნა'}, status=status.HTTP_404_NOT_FOUND)
    elif language == 'ENG':
        return Response({'Order Not Exist'}, status=status.HTTP_404_NOT_FOUND)
    elif language == 'RUS':
        return Response({'Заказ не найден'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'Order Not Exist'}, status=status.HTTP_404_NOT_FOUND)


def without_permission(language):
    if language == 'GEO':
        return Response({'თქვენ არ გაქვთ ამ მოქმედების შესრულების ნებართვა.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    elif language == 'ENG':
        return Response({'You do not have permission to perform this action.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    elif language == 'RUS':
        return Response({'У вас нет разрешения на выполнение этого действия.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    else:
        return Response({'You do not have permission to perform this action.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


def order_with_id_not_exist(language):
    if language == 'GEO':
        return Response({'შეკვეთა ამ ID-ით არ არსებობს.'}, status=status.HTTP_404_NOT_FOUND)
    elif language == 'ENG':
        return Response({'Order with this ID does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    elif language == 'RUS':
        return Response({'Заказа с таким идентификатором не существует.'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'Order with this ID does not exist.'}, status=status.HTTP_404_NOT_FOUND)


def product_with_id_not_exist(language):
    if language == 'GEO':
        return Response({'პროდუქტი ამ ID-ით არ არსებობს.'}, status=status.HTTP_404_NOT_FOUND)
    elif language == 'ENG':
        return Response({'Product with this ID does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    elif language == 'RUS':
        return Response({'Товар с таким идентификатором не существует.'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'Product with this ID does not exist.'}, status=status.HTTP_404_NOT_FOUND)


def user_not_found(language):
    if language == 'GEO':
        return Response({'მომხმარებელი ვერ მოიძებნა!'}, status=status.HTTP_404_NOT_FOUND)
    elif language == 'ENG':
        return Response({'User not found!'}, status=status.HTTP_404_NOT_FOUND)
    elif language == 'RUS':
        return Response({'Пользователь не найден!'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'User not found!'}, status=status.HTTP_404_NOT_FOUND)


def current_password_not_correct(language):
    if language == 'GEO':
        return Response({'მიმდინარე პაროლი არასწორია'}, status=status.HTTP_400_BAD_REQUEST)
    elif language == 'ENG':
        return Response({'Current password is not correct.'}, status=status.HTTP_400_BAD_REQUEST)
    elif language == 'RUS':
        return Response({'Текущий пароль неверен'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'Current password is not correct.'}, status=status.HTTP_400_BAD_REQUEST)


