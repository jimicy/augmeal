//C#
using UnityEngine;
using System.Collections;

public class Buttons : MonoBehaviour {

	bool rotate = false;
	GameObject[] models;
	int model_index = 0;
	string label_text;
	string[] menu = {"10 sushi","Bento","Ice Cream","Rice","Sashimi","Sushi Lunch Combo","Sushi Platter","Tea Cup","Unaju"};

	//on start make the model_index at 0 visible
	void Start() {
		model_index = Data.selected;
		setActiveModel (model_index);

		//get current dish name
		label_text = menu [model_index];
	}

	//sets the model_index model as the only active model
	void setActiveModel(int model_index) {
		// if you want the underlying GameObject
		models = new GameObject[transform.childCount];

		//initial index
		int index = 0;

		foreach(Transform child in transform)
		{
			models[model_index] = child.gameObject;

			if (index == model_index)
			{
				child.gameObject.SetActive(true);
			}
			else
			{
				child.gameObject.SetActive(false);
			}

			index++;
		}
	}
	
	void OnGUI () {


		GUIStyle customButton = new GUIStyle("button");
		customButton.fontSize = 60;
		//customButton.font = Resources.Load;

		GUIStyle customLabel = new GUIStyle("label");
		customLabel.fontSize = 60;
		//customLabel.font = Resources.Load(Fon;

		//Make gui text
		GUI.Label(new Rect(Screen.width/2-170,0,400,200), label_text, customLabel);
		
		// Make the rotate button in the middle
		if(GUI.Button(new Rect(Screen.width/2-100,Screen.height-200,200,200), "Rotate", customButton)) {
			rotate = !rotate;
		}
		
		//Make the previous button
		if(GUI.Button(new Rect(0,Screen.height-200,200,200), "<-", customButton)) {

			//turn rotate to false if going to previous model
			rotate = false;

			if (model_index==0)
			{
				model_index = models.Length-1;
				setActiveModel(model_index);
			}
			else
			{
				model_index -= 1;
				setActiveModel(model_index);
			}

			print (models[model_index].name);

			//update label
			label_text = menu [model_index];
		}

		// Make the next button
		if(GUI.Button(new Rect(Screen.width-200,Screen.height-200,200,200), "->", customButton)) {

			//turn rotate to false if going to next model
			rotate = false;

			if ( model_index==models.Length-1)
			{
				model_index = 0;
				setActiveModel(model_index);
			}
			else
			{
				model_index += 1;
				setActiveModel(model_index);
			}

			//update label
			label_text = menu [model_index];
			
		}
	}

	void Update() {
		if (rotate==true)
		{
			transform.Rotate(0, 1, 0, Space.Self);
		}

		if (Input.GetKeyDown(KeyCode.Escape))
		{
			Application.LoadLevel("main_menu");
		}
	}
}
	