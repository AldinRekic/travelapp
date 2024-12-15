import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from "react-native";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xeliynvlkfkpkrhiuxlt.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlbGl5bnZsa2ZrcGtyaGl1eGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMDcyMjcsImV4cCI6MjA0OTY4MzIyN30.sq2UxnjHtIEK84XwVtw5_Q0z7oX1qSe7hptbpi8QU6A";
const supabase = createClient(supabaseUrl, supabaseKey);

async function signUpNewUser() {
	const { data, error } = await supabase.auth.signUp({
		email: "valid.email@supabase.io",
		password: "example-password",
		options: {
			emailRedirectTo: "https://example.com/welcome",
		},
	});
}


function MyForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [submittedData, setSubmittedData] = useState(null);

	const onSubmit = (data: any) => {
		console.log("Submitted Data:", data);
		setSubmittedData(data);
	};

	useEffect(() => {
		signUpNewUser();
	}, []);

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Controller
					control={control}
					render={({ field }) => (
						<TextInput {...field} style={styles.input} placeholder="Your Name" />
					)}
					name="name"
					rules={{ required: "You must enter your name" }}
				/>
				{errors.name && <Text style={styles.errorText}>{errors.name.message?.toString()}</Text>}

				<Controller
					control={control}
					render={({ field }) => <TextInput {...field} style={styles.input} placeholder="Email" />}
					name="email"
					rules={{
						required: "You must enter your email",
						pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email address" },
					}}
				/>
				{errors.email && <Text style={styles.errorText}>{errors.email.message?.toString()}</Text>}

				<Button title="Submit" onPress={handleSubmit(onSubmit)} />
				{/* 
				{submittedData && (
					<View style={styles.submittedContainer}>
						<Text style={styles.submittedTitle}>Submitted Data:</Text>
						<Text>Name: {submittedData.name}</Text>
						<Text>Email: {submittedData.email}</Text>
					</View>
				)} */}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		padding: 8,
	},
	errorText: {
		color: "red",
		marginBottom: 10,
	},
});

export default MyForm;
