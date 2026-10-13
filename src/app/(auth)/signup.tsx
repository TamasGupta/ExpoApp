import { useSignUp } from "@clerk/expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CodeFormValues,
  codeSchema,
  SignupSchema,
} from "../../../lib/schemas/auth";
export default function signup() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const isLoading = fetchStatus === "fetching";
  const [email, setEmail] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const {
    control: codeControl,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors },
  } = useForm<CodeFormValues>({
    resolver: zodResolver(codeSchema),
    mode: "onBlur",
    defaultValues: { code: "" },
  });

  const onSignupPress = async (values: SignupSchema) => {
    setEmail(values.email);

    const { error } = await signUp.password({
      emailAddress: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    });

    if (error) {
      // console.error(JSON.stringify(error, null, 2));
      return;
    }
    if (!error) await signUp.verifications.sendEmailCode();
  };

  const onVerifyPress = async ({ code }: { code: string }) => {
    await signUp.verifications.verifyEmailCode({ code });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return;
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else {
      console.error("Singup failed", signUp);
    }

    if (signUp.status == "complete") return null;
  };

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <KeyboardAvoidingView className="flex-1 bg-brand-body">
        <View className=" justify-center px-6 mt-16 flex-1">
          <Image
            className="w-36 h-16 mb-8"
            resizeMode="contain"
            source={require("../../../assets/images/logo-glow.png")}
          />

          <Text className="text-3xl font-bold text-black mb-2 leading-tight">
            Verify your account
          </Text>
          <Text className="text-brand-text-muted font-bold text-base mb-8">
            We've sent a code to {email}
          </Text>

          <Controller
            control={codeControl}
            name="code"
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  className=" border mb-3 border-[#E8E6DF] bg-white rounded-xl px-4 py-3 text-body"
                  placeholder="Verification code"
                  placeholderTextColor="#8A8D96"
                  onChangeText={onChange}
                  value={value}
                ></TextInput>
              );
            }}
          ></Controller>

          {codeErrors.code && (
            <Text className="text-brand-coral text-sm">
              {codeErrors.code.message}
            </Text>
          )}
          {errors.fields.code && (
            <Text className="text-brand-coral text-sm">
              {errors.fields.code.message}
            </Text>
          )}

          <TouchableOpacity
            className="w-full bg-brand-blue py-4 rounded-xl items-center mb-4"
            onPress={handleCodeSubmit(onVerifyPress)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-base">Verify</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => signUp.verifications.sendEmailCode()}
            className="py-2"
          >
            <Text>Resend Code</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signUp.reset()} className="py-2">
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      className="flex-1 bg-brand-body"
    >
      <View className="flex-1 justify-center px-6 mt-16">
        <Image
          source={require("../../../assets/images/android-icon-foreground.png")}
          className="w-36 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-black mb-2 leading-tight">
          Create Account
        </Text>
        <Text className="text-brand-text-muted font-bold text-base mb-8">
          Track Your Money, powered by AI.
        </Text>
        <View className="flex-row gap-3 mb-3">
          <Controller
            control={control}
            name="firstName"
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  className="flex-1 border border-[#E8E6DF] bg-white rounded-xl px-4 py-3 text-body"
                  placeholder="First Name"
                  placeholderTextColor="#8A8D96"
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  className="flex-1 border border-[#E8E6DF] bg-white rounded-xl px-4 py-3 text-body"
                  placeholder="Last Name"
                  placeholderTextColor="#8A8D96"
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
        </View>
        {(formErrors.firstName || formErrors.lastName) && (
          <Text className="text-brand-coral mb-1 text-sm">
            {formErrors.firstName?.message || formErrors.lastName?.message}
          </Text>
        )}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => {
            return (
              <TextInput
                className=" border mb-3 border-[#E8E6DF] bg-white rounded-xl px-4 py-3 text-body"
                placeholder="Email "
                placeholderTextColor="#8A8D96"
                onChangeText={onChange}
                value={value}
              />
            );
          }}
        />
        {formErrors.email && (
          <Text className="text-brand-coral  text-sm">
            {formErrors.email?.message}
          </Text>
        )}
        {errors.fields.emailAddress && (
          <Text className="text-brand-coral  text-sm">
            {errors.fields.emailAddress?.message}
          </Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => {
            return (
              <TextInput
                className="mb-3 border border-[#E8E6DF] bg-white rounded-xl px-4 py-3 text-body"
                placeholder="Password "
                placeholderTextColor="#8A8D96"
                onChangeText={onChange}
                secureTextEntry
                value={value}
              />
            );
          }}
        />
        {formErrors.password && (
          <Text className="text-brand-coral mb text-sm">
            {formErrors.password?.message}
          </Text>
        )}
        {errors.fields.password && (
          <Text className="text-brand-coral mb- text-sm">
            {errors.fields.password?.message}
          </Text>
        )}

        <TouchableOpacity
          className="bg-brand-blue py-4 rounded-xl mb-4 justify-center items-center"
          onPress={handleSubmit(onSignupPress)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-base">Sign Up</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-brand-text-muted">
            Already have an account?{" "}
          </Text>

          <Link href={"/sign-in"}>
            <Text className="text-brand-blue font-semibold ">Sign In</Text>
          </Link>
        </View>

        <View nativeID="clerk-captcha" />
      </View>
    </KeyboardAvoidingView>
  );
}
