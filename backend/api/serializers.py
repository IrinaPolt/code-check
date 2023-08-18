from rest_framework import serializers
from filemanagement.models import CodeFile
from users.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'password')

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class CodeFileCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = CodeFile
        fields = ('file', )

    def create(self, validated_data):
        user = self.context['request'].user
        file = validated_data['file']
        filename = validated_data['file'].name

        file_content = file.read().decode('utf-8')

        code_file = CodeFile(
            author=user,
            title=filename,
            text=file_content,
            file=file
        )
        code_file.save()
        return code_file

    def update(self, instance, validated_data):
        instance.file = validated_data.get('file', instance.file)
        instance.full_clean()
        instance.save()
        return instance


class CodeFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = CodeFile
        fields = ('title', 'created_at', 'updated_at')
