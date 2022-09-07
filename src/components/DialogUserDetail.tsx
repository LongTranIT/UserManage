import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { User } from "../interfaces";

function DialogUserDetail({ userSelected, toggleDialog }: { userSelected: User, toggleDialog: () => void }) {
	return (<div>
		<Dialog title={"User Detail"} onClose={toggleDialog}>
			<div className="text-center text-3xl text-blue-600">{userSelected?.name}</div>
			<div className="m-4">
				<b>Id:</b> {userSelected?.id}
				<br />
				<b>Name:</b> {userSelected?.name}
				<br />
				<b>Gender:</b> {userSelected?.gender}
				<br />
				<b>Day of birth:</b> {(new Date(userSelected?.date)).toLocaleDateString('vi-VN')}
				<br />
				<b>Email:</b> {userSelected?.email}
				<br />
				<b>Address:</b>
				<Grid data={[userSelected?.address]} >
					<GridColumn field="apartment_number" title="Street" width="100px" />
					<GridColumn field="ward" title="Suite" width="200px" />
					<GridColumn field="district" title="City" width="200px" />
					<GridColumn field="city" title="Zipcode" width="200px" />
				</Grid>
				<br />
				<b>Phone:</b>{userSelected?.phone}
				<br />
				<b>Describe:</b>
				<p style={{whiteSpace: "pre-wrap"}} className='ml-8'>{userSelected?.describe}</p>
				<br />
				<b>Favorite:</b>
				<ul className="ml-8">
					{userSelected?.favorite.map((item,index)=><li className="list-disc" key={index}>{item}</li>)}
				</ul>
			</div>

			<DialogActionsBar>
				<Button icon={"close"} themeColor={"tertiary"} className="my-4 " fillMode="outline" onClick={toggleDialog}>
					Close
				</Button>
			</DialogActionsBar>
		</Dialog>
	</div>);
}

export default DialogUserDetail;